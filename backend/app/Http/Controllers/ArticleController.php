<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ArticleController extends Controller
{
    /**
     * Get all articles (both original and updated)
     */
    public function index()
    {
        return Article::orderBy('created_at', 'desc')->get();
    }

    /**
     * Get the latest article
     * Used by Phase-2 (NodeJS + LLM)
     */
    public function latest()
    {
        return Article::latest('created_at', 'desc')->first();
    }

    /**
     * Store a new article (original or updated)
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'content' => 'required|string',
            'version' => 'nullable|string',
            'source_url' => 'nullable|string'
        ]);

        return Article::create([
            'title' => $request->title,
            'slug' => Str::slug($request->title) . '-' . time(),
            'content' => $request->content,
            'version' => $request->version ?? 'original',
            'source_url' => $request->source_url
        ]);
    }

    /**
     * Update an existing article
     */
    public function update(Request $request, $id)
    {
        $article = Article::findOrFail($id);
        $article->update($request->all());

        return $article;
    }

    /**
     * Delete an article
     */
    public function destroy($id)
    {
        Article::destroy($id);

        return response()->json([
            'message' => 'Article deleted successfully'
        ]);
    }
}
