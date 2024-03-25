<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use App\Models\ScriptState;
use App\Models\ScriptType;
use Illuminate\Http\Resources\Json\JsonResource;

class ScriptResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
      $state = ScriptState::query()->find($this->scriptstate_id);
      $type = ScriptType::query()->find($this->scripttype_id);
        return [
          "id" => $this->id,
          "textscript" => $this->textscript,
          "result"=>$this->result,
          'scriptstate' => [
              'id' => $state->id,
              'state' => $state->state
          ],
          'scripttype' => [
            'id' => $type->id,
            'state' => $type->scripttype
      ]
        ];
    }
}
