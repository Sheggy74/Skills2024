<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;

use App\Models\HRDepartment;
use App\Models\HRPost;
use App\Models\HRUser;

class HRController extends Controller
{
    public function getDataFromHR()
    {

    }



    // http://askillsserv/hr_system/api/post
    // http://askillsserv/hr_system/api/user
    // http://askillsserv/hr_system/api/department

    public function loadUserData() {

        $url = 'http://askillsserv/hr_system/api/user';
        $table_name = 'h_r_users';

        $response = Http::get($url);
        $data     = $response->json();
        if ($response->successful()) {

            // Очищаем таблицу перед сохранением новых данных
            DB::table($table_name)->truncate();
            foreach ($data as $item) {
                DB::table($table_name)->insert(
                    [
                        'username' => $item['Username'],
                        'h_r_post_id' => $item['PostID'],
                        'h_r_department_id' => $item['DepartmentID'],

                    ]
                );
            }
            // Данные сохранены
        } else {
            // Ошибка получения данных
        }


    }

    public function loadDepartmentData() {

        $url = 'http://askillsserv/hr_system/api/department';
        $table_name = 'h_r_department';

        $response = Http::get($url);
        $data     = $response->json();
        if ($response->successful()) {

            // Очищаем таблицу перед сохранением новых данных
            DB::table($table_name)->truncate();
            foreach ($data as $item) {
                DB::table($table_name)->insert(
                    [
                        'name' => $item['Name'],
                        'h_r_post_id' => $item['ID'],
                        'h_r_department_id' => $item['ParentID'],

                    ]
                );
            }
            // Данные сохранены
        } else {
            // Ошибка получения данных
        }


    }


}
