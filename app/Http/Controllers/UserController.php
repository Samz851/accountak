<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function login( Request $request ): Response
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials)) {
            $user = User::where('id', Auth::user()->id)
                        ->with('organization:id,setup')
                        ->first();
            $token = $user->createToken('api_token');
            $request->session()->regenerate();
            
            return response(['success' => true, 'token' => $token->plainTextToken, 'redirectTo' => $user->organization->setup ? "/" : "/setup", 'user' => $user]);
            // return redirect()->intended(route('home'));
        }
        return response('The provided credentials do not match our records.', 401);
        // return back()->withErrors([
        //     'email' => 'The provided credentials do not match our records.',
        // ]);
    }

    public function isAuthenticated( Request $request ): Response
    {
        return response(['success' => $request->user() ? true : false]);
    }

    public function autologin( Request $request ): Response
    {
        return $request->user() ?
                response('success', 200)
                : response('fail', 401);
    }
}
