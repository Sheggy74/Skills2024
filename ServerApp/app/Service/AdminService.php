<?php

namespace App\Service;

use App\Models\Topic;
use App\Models\User;
use App\Models\UserTopic;
use Carbon\Carbon;


class AdminService{

    private $topics;

    public function saveUsers($path){
        $data = $this->parseXML($path);    
        // dd($data)    ;
        $this->loadTopics();
        $this->loadUser($data);
    }

    private function loadTopics(){
        $topics = $this->topics;
        foreach($topics as $topic){
            Topic::firstOrCreate([
                'id' => $topic['@attributes']['TopicId'],
                'upper_level' => isset($topic['@attributes']['TopicUpperLevel']) ? $topic['@attributes']['TopicUpperLevel'] : null,
                'name' => $topic['@attributes']['Name']                
            ]);
        }
    }

    private function loadUser($users){     
        foreach($users as $user){
            User::create([
                'id'=> $user['@attributes']['ID'],
                'first_name'=> $user['@attributes']['Firstname'],
                'second_name'=> $user['@attributes']['Middlename'],
                'last_name'=> $user['@attributes']['Lastname'],
                'prof_level'=> $user['@attributes']['ProfLevel'],
                'gender'=> $user['@attributes']['Gender'],
                'birthday'=> Carbon::createFromFormat('d.m.Y',$user['@attributes']['Birthday']),
                'position' => $user['@attributes']['Position'],
                'boss_id' => $user['@attributes']['Boss_id'] ?? null,
                'login' => $user['Account']['@attributes']['Login'],
                'password' => $user['Account']['@attributes']['Pass']
            ]);
            if(isset($user['Topic_emp']))
            $userTopics = isset($user['Topic_emp']['UserTopic']) ? $user['Topic_emp']['UserTopic'] : [];
            foreach($userTopics as $topic){
                UserTopic::create([
                    'user_id' => $user['@attributes']['ID'],
                    'topic_id' => isset($topic['@attributes']) ? $topic['@attributes']['TopicId'] : $topic['TopicId']
                ]);
            }
        }
    }

    public function parseXML($path){
        // 1. Загрузка XML-файла и преобразование его в массив
        $xml = simplexml_load_file($path);
        $data = json_decode(json_encode((array) $xml), true);
        $this->topics = $data['Topics']['Topic'] ?? [];
        // 2. Извлечение списка сотрудников
        $employees = [];
        if (isset($data['Headcount']['Employee'])) {
            $employees = is_array($data['Headcount']['Employee']) ? $data['Headcount']['Employee'] : [$data['Headcount']['Employee']];
        }
        return $employees;
        // // 3. Создание индексированного массива для быстрого доступа по ID
        // $indexedEmployees = [];
        // foreach ($employees as $employee) {
        //     $indexedEmployees[$employee['@attributes']['ID']] = $employee;
        //     $indexedEmployees[$employee['@attributes']['ID']]['subordinates'] = []; // Добавляем поле для подчиненных
        // }
        // dd($indexedEmployees );
        // // 4. Построение древовидной структуры
        // $rootNodes = [];
        // foreach ($indexedEmployees as &$employee) {
        //     $bossId = isset($employee['@attributes']['Boss_id']) ? (int) $employee['@attributes']['Boss_id'] : null;
        
        //     if ($bossId === null || !isset($indexedEmployees[$bossId])) {
        //         // Если у сотрудника нет руководителя или руководитель не найден, это корневой элемент
        //         $rootNodes[] = &$employee;
        //     } else {
        //         // Добавляем сотрудника как подчиненного к его руководителю
        //         $indexedEmployees[$bossId]['subordinates'][] = &$employee;
        //     }
        // }
        
        // // 5. Преобразование массива в объекты
        // return $this->convertArrayToObject($rootNodes);
    }
        
    private function convertArrayToObject(array $data)
    {
        $objects = [];
        foreach ($data as $item) {
            $object = new \stdClass();
            foreach ($item as $key => $value) {
                if ($key === 'subordinates' && is_array($value)) {
                    $object->$key = $this->convertArrayToObject($value); // Рекурсивно обрабатываем подчиненных
                } else {
                    $object->$key = $value;
                }
            }
            $objects[] = $object;
        }
        return $objects;
    }
        


}