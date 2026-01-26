<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserTraining;

class UserTrainingController extends Controller
{
    public function myTrainings(Request $request)
{
    $user = $request->user();

    $trainings = UserTraining::with('training')
        ->where('user_id', $user->id)
        ->get();

    return response()->json($trainings);
}

}
