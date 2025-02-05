<?php

namespace App\Http\Controllers;

use App\Http\Resources\TopicResource;
use App\Models\Deadline;
use App\Models\PlanOrder;
use App\Models\Topic;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use App\Models\Task;
use App\Models\Project;
use App\Models\Priority;
use App\Models\User;
use App\Models\State;
use App\Http\Resources\TaskResource;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\UserRoleResource;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class PlanController extends Controller
{

    public function showTasksForUser(Request $request, $id)
    {
        $tasks = Task::with(['priority', 'user'])
            ->where('user_id', '=', $id)
            ->rightJoin('topics', 'topics.id', '=', 'task.topic_id')
            ->select('task.*', 'topics.name as topics_name')
            ->orderBy('order_number')
            ->whereBetween('created_at', [
                Carbon::now()->startOfMonth(), // начало текущего месяца
                Carbon::now()->endOfMonth()    // конец текущего месяца
            ])->get();
        // return $tasks;
        return TaskResource::collection($tasks);
    }


    public function showUsers(Request $request, $id)
    {
        // $users = DB::connection('pgsql')->table('users')->orWhere([['id', $id],['boss_id', $id]])->get();
        $users = User::orWhere([['id', $id], ['boss_id', $id]])->get();
        // return $users;
        return UserResource::collection($users);
    }

    public function getPlans(Request $request)
    {
        $user = auth()->user();
        $whereSubs = $user->boss_id ? " and (u.id = $user->id or u.boss_id = $user->id" : '';
        $query = "
            select u.id, u.first_name,u.second_name,u.last_name
            from users u
            where u.id <> 1
        " . $whereSubs;
        $users = DB::select($query);

        $plans = [];
        foreach( $users as $user ) {
        $query = "
            select t.id,
                   t.name,
                   t.description,
                   to_char(t.created_at,'dd.mm.yyyy hh:MM') as dateCreation,
                   tt.name as topic,
                   t.days,
                   t.order_number,
                   t.priority_id,
                   t.is_planned,
                   rt.percent,
                   exists(select 1 from state_task st where st.task_id = t.id) as isCompleted
            from task t 
            join topics tt on tt.id = t.topic_id            
            left join report_task rt on rt.task_id = t.id            
            where t.user_id = $user->id and date_trunc('month',t.created_at) = date_trunc('month',current_date)";
            $tasks = DB::select($query);
            $plans[] = [
                "user" => $user,
                'tasks' => $tasks
            ];
        }

        return $plans;
    }

    public function showTopics(Request $request)
    {
        // $users = DB::connection('pgsql')->table('users')->orWhere([['id', $id],['boss_id', $id]])->get();
        $topics = Topic::get();
        return TopicResource::collection($topics);
    }

    public function showTopicsUser(Request $request, $id)
    {
        $subordinateIds = User::getAllSubordinates($id);

        $topics = DB::connection('pgsql')->table('user_topics')
            ->leftJoin('users', 'user_topics.user_id', '=', 'users.id')
            ->leftJoin('topics', 'user_topics.topic_id', '=', 'topics.id')
            ->select("topics.*")
            ->whereIn('users.id', $subordinateIds)->distinct()->get();
        // return $topics;
        return TopicResource::collection($topics);
    }


    public function showManagerId(Request $request) {
        $manager = User::where('boss_id', null)->first();
        return $manager->id;
    }

    public function showAllSubardinates(Request $request, $id) {
        $subordinateIds = User::getAllSubordinates($id);
        $subordinateIds[] = $id;
        $subardinates = User::whereIn('id', $subordinateIds)->get();
        return UserResource::collection($subardinates);
    }

    public function showWorkloadUser(Request $request, $id) {
        $workload = Task::where('user_id', $id)->sum('days');
        return $workload;
    }

    public function saveOrder(Request $request){
        $user = auth()->user();

        DB::statement("insert into plan_order (user_id, \"order\", name) values($user->id,'$request->order','$request->name')");
    }

    public function getUserDataById(Request $request, $id){
        $user = User::find($id);
        return $user;
    }

    public function getOrders(Request $request){
        $user = auth()->user();
        $query = "select * from plan_order where user_id = $user->id";
        return DB::select($query);
    }

}
