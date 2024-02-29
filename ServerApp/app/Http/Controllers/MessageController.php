<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class MessageController extends Controller
{
    public function index(Request $request){
        $to_name = 'ATOM24';
        $to_email = 'jeti74@mail.ru';
        $data = array('name'=>"Andrey", "body" => $request->message);
        Mail::send('emails', $data, function($message) use ($to_name, $to_email) {
            $message->to($to_email, $to_name)->subject('Artisans Web Testing Mail');
            $message->from('AtomSkills2023@yandex.ru','Artisans Web');
        });
        return 'ok';
    }


}
