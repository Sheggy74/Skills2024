<?php

namespace App\Service;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardService
{

    public function getMyProjects(Request $request)
    {
        $user = auth()->user();
        $query = "with base as (select * from (select p.name,t.id as task_id, st.state_id, row_number() over (partition by t.id order by st.created_at desc) as state_num
from rule_project rp
join project p on p.id =rp.project_id
left join task t on t.project_id = p.id
left join state_task st on st.task_id = t.id
left join performer pe on pe.task_id = t.id
where rp.user_id = $user->id and pe.user_id = $user->id) a where a.state_num = 1)
                select
        'Все' as name,
	count(distinct t.id) as total_cnt,
	count(distinct case when st.state_id = 3 then t.id end) as finished_cnt
	from task t
	join performer p on p.task_id = t.id
	left join state_task st on st.task_id  = t.id
	    where p.user_id = $user->id
        union all
select base.name,total.cnt as total_cnt, coalesce(finished.cnt,0) as finished_cnt
from base
left join (select name, count(*) as cnt from base where task_id is not null group by name) total on total.name = base.name
left join (select name, count(*) as cnt from base where state_id = 3 group by name) finished on finished.name = base.name
where total.cnt is not null
        group by base.name, total.cnt,finished.cnt
        ";
        return DB::select($query);
    }

    public function getMyTasks(Request $request)
    {
        $project_id = $request->project_id ?? 'null';

        $user = auth()->user();
        $query = "                select
	count(distinct t.id) as total_cnt,
	count(distinct case when st.state_id = 3 then t.id end) as finished_cnt
	from task t
	join performer p on p.task_id = t.id
	left join state_task st on st.task_id  = t.id
	    where p.user_id = $user->id and t.project_id = coalesce($project_id,t.project_id)
";
        return DB::select($query);
    }

    public function getSpentTime(Request $request)
    {
        $project_id = $request->project_id ?? 'null';

        $user = auth()->user();

        $query = "
        select * from (select
	            t.name,
	            extract(EPOCH from (coalesce(st.created_at, now()) - t.created_at)) / 60 as time_spent
            from task t
            join performer p on t.id = p.task_id
            left join state_task st on t.id = st.task_id and st.state_id = 3
            where p.user_id = $user->id and t.project_id = coalesce($project_id,t.project_id)
            ) a
            group by a.name, a.time_spent
        ";
        return DB::select($query);
    }
}
