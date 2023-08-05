<?php

namespace App\Http\Controllers;

use App\Models\User;

use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Hash;

class AuthController extends Controller
{
    public function register(Request $request){
        $input = $request->only('name', 'email', 'password');
        User::create([
            'name' => $input['name'],
            'email' => $input['email'],
            'password' => Hash::make($input['password'])
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Successfully Registered'
        ]);
    }

    public function login(Request $request){
        $cred = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required']
        ]);

        if (Auth::attempt($cred)) {
            $user = auth()->user();
            $token = $user->createToken('myApp')->plainTextToken;

            return response()->json([
                'status' => true,
                'message' => 'Login Success',
                'access_token' => $token,
                'cred' => $cred
        ]);
    }

    return response()->json([
        'status' => false,
        'message' => 'Invalid email or password'
    ]);
}
}