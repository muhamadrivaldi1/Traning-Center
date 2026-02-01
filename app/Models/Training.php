<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Training extends Model
{
    use HasFactory;

    protected $table = 'training';

    protected $fillable = [
        'name',
        'description',
        'image',
    ];

    public function registrations()
    {
        return $this->hasMany(TrainingRegistration::class);
    }
}
