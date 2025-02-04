<?php

namespace App\Service;


class AdminService{

    public function parseXML($path){
        // 1. Загрузка XML-файла и преобразование его в массив
        $xml = simplexml_load_file($path);
        $data = json_decode(json_encode((array) $xml), true);
        
        // 2. Извлечение списка сотрудников
        $employees = [];
        if (isset($data['Headcount']['Employee'])) {
            $employees = is_array($data['Headcount']['Employee']) ? $data['Headcount']['Employee'] : [$data['Headcount']['Employee']];
        }

        // 3. Создание индексированного массива для быстрого доступа по ID
        $indexedEmployees = [];
        foreach ($employees as $employee) {
            $indexedEmployees[$employee['@attributes']['ID']] = $employee;
            $indexedEmployees[$employee['@attributes']['ID']]['subordinates'] = []; // Добавляем поле для подчиненных
        }

        // 4. Построение древовидной структуры
        $rootNodes = [];
        foreach ($indexedEmployees as &$employee) {
            $bossId = isset($employee['@attributes']['Boss_id']) ? (int) $employee['@attributes']['Boss_id'] : null;
        
            if ($bossId === null || !isset($indexedEmployees[$bossId])) {
                // Если у сотрудника нет руководителя или руководитель не найден, это корневой элемент
                $rootNodes[] = &$employee;
            } else {
                // Добавляем сотрудника как подчиненного к его руководителю
                $indexedEmployees[$bossId]['subordinates'][] = &$employee;
            }
        }
        
        // 5. Преобразование массива в объекты
        return $this->convertArrayToObject($rootNodes);
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
        
    

    // private function getFromFile($path){
    //     $file = file_get_contents($path);
    //     return $file;
    // }

}