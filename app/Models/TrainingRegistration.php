<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TrainingRegistration extends Model
{
    use HasFactory;

    protected $table = 'training_registrations';

    protected $fillable = [
        'user_id',
        'training_id',
        'progress',
        'status',
        'start_date',
        'end_date',
        'snap_token',
        'payment_status',
        'payment_type',
        'paid_at',
    ];

    public function training()
    {
        return $this->belongsTo(Training::class, 'training_id');
    }
}
