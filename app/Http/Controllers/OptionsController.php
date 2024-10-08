<?php

namespace App\Http\Controllers;

use App\Models\Options;
use App\Traits\HasFileUploads;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;
use PhpOption\Option;

class OptionsController extends Controller
{
    use HasFileUploads;

    const X_ACCOUNTAK_ONBOARDING = 'X-ACCOUNTAK-ONBOARDING';

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response(Options::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // $request->merge(['id' => $request->user()->organization->options->id]);
        Log::info($request->file(), [__LINE__, __FILE__]);
        if ($request->file('logo_file')) {
            $directory = 'logos/'.$request->user()->organization->id;
            $file = $request->file('logo_file');
            if ($fileUploadedData = $this->uploadSingleFile($file, $directory)) {
                $request->merge(['logo' => 'storage/'.$fileUploadedData['filepath']]);
            }
        }
        Log::info($request->all(), [__LINE__, __FILE__]);


        $optionsData = $request->except(['logo', 'logo_file']);
        $options = Options::where('id', $request->user()->organization->options->id)->update($optionsData);
        // $options = $request->user()
        //         ->organization
        //         ->options()
        //         ->update($request->except(['logo', 'logo_file'])->toArray());
                Log::info([$optionsData, $request->all()], [__LINE__, __FILE__]);

        $onboarded = $request->user()
                ->organization
                ->update([
                    'onboarded' => 1,
                    'logo' => $request->get('logo'),
                ]);
                Log::info($request->all(), [__LINE__, __FILE__]);

        return response($request->user()
        ->organization
        ->options)->withoutCookie(self::X_ACCOUNTAK_ONBOARDING);
    }

    /**
     * Display the specified resource.
     */
    public function show(Options $options): Response
    {

        return response($options);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Options $options)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Options $options)
    {
        //
    }
}
