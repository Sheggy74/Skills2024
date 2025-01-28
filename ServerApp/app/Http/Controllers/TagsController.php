<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Interface\CrudController;
use App\Http\Resources\TagsResource;
use App\Models\Tags;
use Illuminate\Http\Request;

class TagsController extends Controller implements CrudController
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }
    
    public function index(Request $request)
    {
        $data =  Tags::query()->orderBy('id','desc')->get();
        return TagsResource::collection($data);
    }

    public function show($id, Request $request)
    {
        $data = Tags::query()->find($id);
        return new TagsResource($data);
    }

    public function create(Request $request)
    {
        $data = Tags::query()->create([
            'name' => $request->name
        ]);
        return new TagsResource($data);
    }

    public function update($id, Request $request)
    {
        Tags::query()->find($id)->update([
            'name' => $request->name
        ]);
        $data = Tags::query()->find($id);
        return new TagsResource($data);
    }

    public function delete($id)
    {
        Tags::query()->find($id)->delete();
        return 0;
    }
}
