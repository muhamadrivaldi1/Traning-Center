<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TrainingRegistration extends Model
{
    protected $fillable = [
        'user_id',
        'training_id',
        'progress',
        'status',
        'start_date',
        'end_date'
    ];

    public function training()
    {
        return $this->belongsTo(Training::class);
    }
}
