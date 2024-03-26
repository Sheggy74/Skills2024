<?php

namespace App\Http\Controllers;
use App\Models\Script;
use Illuminate\Http\Request;
use App\Http\Resources\ScriptResource;
use Illuminate\Support\Facades\DB;
use App\Models\User;


class ScriptController extends Controller
{
    public function index(Request $request)
    {
        $data =  Script::query()->get();
        //return DB::SELECT('select * from scripts');
        return ScriptResource::collection($data);
    }

    public function show($id, Request $request)
    {
        $data = Script::query()->find($id);
        return new ScriptResource($data);
    }

    public function create( Request $request)
    {
        if ($request->scripttype == 0)
        {
            try{
                $res =  DB::SELECT($request->textscript);
                $maxId = DB::table('scripts')->max('id');
                $result = DB::INSERT('INSERT INTO scripts
                (id,scriptstate_id, textscript, scripttype_id, "result")
                VALUES(? ,?, ?, ?, ?) returning id',[$maxId+1,1, $request->textscript,$request->scripttype, json_encode($res[0]) ]);
                $data = Script::query()->find($maxId+1);
                    return new ScriptResource($data);
            }
            catch(\Illuminate\Database\QueryException $ex)
            {
                $maxId = DB::table('scripts')->max('id');
                $result = DB::INSERT('INSERT INTO scripts
                (id,scriptstate_id, textscript, scripttype_id, "result")
                VALUES(? ,?, ?, ?, ?) returning id',[$maxId+1,2, $request->textscript,$request->scripttype, $ex->getMessage() ]);
                $data = Script::query()->find($maxId+1);
                    return new ScriptResource($data);
            }

        }
        if ($request->scripttype == 2)
        {
            if ($request->textscript != null)
            {
                $maxId = DB::table('scripts')->max('id');
                $result = DB::INSERT('INSERT INTO scripts
                (id,scriptstate_id, textscript, scripttype_id, "result")
                VALUES(? ,?, ?, ?, ?) returning id',[$maxId+1,1, $request->textscript,$request->scripttype, $request->result ]);
                $data = Script::query()->find($maxId+1);
                    return new ScriptResource($data);
            }
        }
   
    
    }


}
