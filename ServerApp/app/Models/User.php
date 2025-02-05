<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Tymon\JWTAuth\Contracts\Providers\JWT;
use App\Models\Role;

class User extends Authenticatable implements JWTSubject
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'id',
        'first_name',
        'second_name',
        'last_name',
        'photo_url',        
        'login',
        'password',
        'boss_id',
        'gender',
        'birthday',
        'position',
        'prof_level',
        'can_add',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }

    public function roles()
    {
        return $this->belongsToMany(Role::class, 'user_roles', 'user_id', 'role_id');
    }

    public function tasks()
    {
        return $this->belongsToMany(Task::class, 'rule_task', 'user_id', 'task_id');
    }

    public function projects()
    {
        return $this->belongsToMany(Project::class, 'rule_project', 'user_id', 'project_id');
    }

    // подчиненые
    public function subordinates()
    {
        return $this->hasMany(User::class, 'boss_id');
    }

    public function allSubordinates()
    {
        return $this->subordinates()->with('allSubordinates');
    }

    // тематики
    public function topics()
    {
        return $this->belongsToMany(Topic::class, 'user_topics', 'user_id', 'topic_id');
    }

    public static function getAllSubordinates($userId, &$processedUsers = [])
    {
        // Если пользователь уже обработан, выходим из функции
        if (in_array($userId, $processedUsers)) {
            return [];
        }

        // Добавляем пользователя в список обработанных
        $processedUsers[] = $userId;

        // Ищем всех подчинённых текущего пользователя
        $subordinates = User::where('boss_id', $userId)->get();
        $allSubordinates = $subordinates->pluck('id')->toArray();

        // Рекурсивно обрабатываем подчинённых каждого подчинённого
        foreach ($subordinates as $subordinate) {
            $allSubordinates = array_merge($allSubordinates, self::getAllSubordinates($subordinate->id, $processedUsers));
        }

        return array_unique($allSubordinates);  // Возвращаем уникальные ID
    }
}
