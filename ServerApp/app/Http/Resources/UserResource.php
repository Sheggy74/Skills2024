<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'firstName' => $this->first_name,
            'secondName' => $this->second_name,
            'lastName' => $this->last_name,
            'photoURL' => $this->photo_url,
            'email' => $this->email,
            'login' => $this->login,
            'role' => $this->roles && count($this->roles) > 0 ? $this->roles[0] : null,
            'place' => $this->place,
            'job' => $this->job,
            'phone' => $this->phone
        ];
    }
}
