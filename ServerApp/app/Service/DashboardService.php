<?php

namespace App\Service;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardService
{

    public function getMyProjects(Request $request)
    {
        $user = auth()->user();
        $query = "
            with base as (select p.name,t.id as task_id, tj.state_task_id, row_number() over (partition by t.id order by tj.created_at desc) as state_num
                            from rule_project rp
                            join project p on p.id =rp.project_id
                            left join task t on t.project_id = p.id
                            left join time_job tj on tj.task_id = t.id and tj.user_id = rp.user_id
                            where rp.user_id = $user->id)
                            select base.name,total.cnt as total_cnt, finished.cnt as finished_cnt
                            from base
                            left join (select name, count(*) as cnt from base where task_id is not null group by name) total on total.name = base.name
                            left join (select name, count(*) as cnt from base where state_task_id = 3 group by name) finished on finished.name = base.name
                            where total.cnt is not null";
        return DB::select($query);
    }
}
