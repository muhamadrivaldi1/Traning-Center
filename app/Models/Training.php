<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
// Tambahkan ini jika file ada di folder berbeda
// use App\Models\TrainingRegistration; 

class Training extends Model
{
    use HasFactory;

    protected $table = 'trainings';

    // id dihapus dari fillable karena biasanya auto-increment
    protected $fillable = [
        'name',
        'description',
        'duration',
        'schedule',
        'price',
        'image',
        'benefits'
    ];

    public function registrations()
    {
        // Pastikan model TrainingRegistration sudah dibuat!
        return $this->hasMany(TrainingRegistration::class);
    }
}