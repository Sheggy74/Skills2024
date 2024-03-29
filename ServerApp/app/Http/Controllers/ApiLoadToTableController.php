<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\DB;

class ApiLoadToTableController extends Controller
{
    public function loadData(Request $request){
        $url = "http://webdserv/studentback/api/hr/scripts";
        // либо $json = json_decode(file_get_contents($url), true);
        // return $json;
        $table_name = 'scripts';
        $response = Http::get($url);
        $data     = $response->json();
        if ($response->successful()) {
            // Очищаем таблицу перед сохранением новых данных
            DB::table($table_name)->truncate();
            foreach ($data as $item) {
                DB::table($table_name)->insert(
                    [
                        'textscript' => $item['textscript'],
                        'result' => $item['result'],
                        'scriptstate_id' => $item['scriptstate_id'],
                        'scripttype_id' => $item['scripttype_id'],
                    ]
                );
            }
            return 'ok';
        } else {
            return response()->json(['message' => 'Ошибка при обновлении'],500);
        }

    }


}
