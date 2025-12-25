<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Symfony\Component\DomCrawler\Crawler;
use App\Models\Article;
use Illuminate\Support\Str;

class ScrapeBeyondChatsBlogs extends Command
{
    protected $signature = 'scrape:beyondchats';
    protected $description = 'Scrape 5 oldest blogs from BeyondChats';

    public function handle()
    {
        $url = 'https://beyondchats.com/blogs/';
        $response = Http::get($url);

        if (!$response->successful()) {
            $this->error('Failed to fetch blogs page');
            return;
        }

        $crawler = new Crawler($response->body());

        // NOTE: Selector is based on inspection of blog cards
        $blogs = $crawler->filter('a')->each(function ($node) {
            return [
                'title' => trim($node->text()),
                'link' => $node->attr('href')
            ];
        });

        // Take last 5 (oldest)
        $blogs = array_slice(array_filter($blogs), -5);

        foreach ($blogs as $blog) {
            if (empty($blog['title']) || empty($blog['link'])) {
                continue;
            }

            // Avoid duplicates
            if (Article::where('title', $blog['title'])->exists()) {
                continue;
            }

            Article::create([
                'title' => $blog['title'],
                'slug' => Str::slug($blog['title']) . '-' . time(),
                'content' => 'Content scraped placeholder',
                'version' => 'original',
                'source_url' => $blog['link']
            ]);

            $this->info('Saved: ' . $blog['title']);
        }

        $this->info('Scraping completed successfully.');
    }
}
