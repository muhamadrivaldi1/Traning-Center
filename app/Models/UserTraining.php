<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserTraining extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'training_id',
        'start_date',
        'end_date',
        'progress',
        'status'
    ];

    public function training()
    {
        return $this->belongsTo(Training::class);
    }
}
