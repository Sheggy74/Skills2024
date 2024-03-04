<?php

namespace App\Http\Controllers\Interface;


use Illuminate\Http\Request;

interface CrudController
{
    public function index(Request $request);
    public function show($id, Request $request);
    public function create(Request $request);
    public function update($id, Request $request);
    public function delete($id);
}
