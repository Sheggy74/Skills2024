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
            'idPhoto' => $this->photo,
            'email' => $this->email,
            'login' => $this->login
        ];
    }
}
