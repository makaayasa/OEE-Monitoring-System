<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\DataHeader;
use App\Models\LineStop;
use App\Models\Produksi;

class DashboardController extends Controller
{
    public function show()
    {
        return view('dashboard');
    }

    public function getDataHeader()
    {
        $data = DataHeader::all();
        return response()->json($data);
    }

    public function getLinestop()
    {
        $data = LineStop::all();
        return response()->json($data);
    }

    public function getProduksi()
    {
        $data = Produksi::all();
        return response()->json($data);
    }
}
