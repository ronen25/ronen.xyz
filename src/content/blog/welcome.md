---
name: welcome
title: Welcome!
description: Welcome to my blog! In my debut post, I will give a brief introduction to myself and this blog.
publishedAt: 2022-10-16T21:25:00
updatedAt: 2022-10-16T21:25:00
tags: ['personal', 'general', 'site', 'webdev']
---

# Welcome!

## Hi. I'm Ronen.

I have been developing software since I was 13 and will hopefully get to continue as long as I can :-)

Initially beginning with WinForm apps in .NET, I moved to using C++ as I was looking to learn how operating systems work as a systems developer. I enjoyed this greatly, and I got my first job at [Cyren](https://cyren.com) as a C++ developer after being released from the IDF.

### Initial Beginnings

My first job was working on a legacy C++ app with about ~500K LoC (yes, I used Cloc. Yes, it excludes third party dependencies). It was a big challenge, especially since at that time, I had no experience with codebases that big; usually the only things I worked on were small-sized, self-contained codebases, that were either architect by me or by someone in the team I worked at.

I enjoyed the work very much, but eventually something dawned upon me - _is this it_?

Meaning, is C++ the best we can do as developers?

My knowledge up until that point was purely from self-study; I had not done any academic coursework up to that point. So to me C++ was an obvious choice when writing high-performance applications.

However, upon discovering [Rust](https://www.rust-lang.org/), my mindset was completely changed...

Here I suddenly came upon a language (and corresponding toolset) that changed everything I thought about what to expect from a systems language;

1. Turns out, you _can_ actually have safety without compromising on performance and ease of development. You don't have to be scared every time you run something.
2. Your build system doesn't have 20+ years of legacy cruft that catches you off guard when you forget about it (I used CMake, which is pretty much the golden standard of C/C++ build systems - which should tell you something).
3. Your compiler actually has nice errors for the most part, and it turns out you can [actually use this to learn the language](https://www.reddit.com/r/rust/comments/q8t2uk/compiler_error_driven_development/)!

Then I discovered [WebAssembly](https://webassembly.org/), which Rust supported as a first-class compilation target, and that pretty much sealed the deal for me.

I wanted to learn Rust and write with it whatever I could.

### A Change in Direction

Sadly, wanting to do something and actually being allowed to do it are two different things, especially in a capitalist system.

Being unable to use Rust at work was a given, since we could barely take the initiative to use C++11 (it was early 2018). Rewriting stuff in other languages that were more familiar for the team was also a no go.

Jobs that required Rust also required other job experience I didn't have - in particular, modern backend architecture, which I had zero experience with at the time.

Because of this, and after a brief pause in 2019 for school (studying for a Bachelor's, which I sadly did not finish), I decided to go in a different direction entirely - web development.

### Why Web Dev?

The first time I did web development was working on a PHP backend when I was still in high school. This was late 2011 or so. LAMP stack was still hot (I guess. Maybe. So I was told), so that's what I used. To cut a long story short - the guy who I worked for was a real bastard, and I hated every single moment of the work.

I hated it so much I _actively avoided_ web development _for almost a decade_.

That, and a lot of people around me told me that web development is basically centering `div`s and adding some basic styling to them. Nobody told me anything about the _last decade_ of innovation in that field.

Eventually I realized that all I really wanted to do is to make things people would enjoy using. I enjoy making things from scratch and I actively seek to know at least something in every part of the design and implementation. I want to do something better, and I want to eventually [own the fruits of my own labor](https://en.wikipedia.org/wiki/Labour_power).

By doing web development, I can realize this dream by building something that users can actually use (or at least try to :-)).

So finally, we come to the creation of my own personal website...

### Creating This Blog

Most of my projects are done for my own sake; I wish to learn something new, and in the process, maybe get to something that will also help others.

Despite it being a bit of an overkill for this kind of application, I decided to use the following [stack](https://jamstack.org/):

1. For the frontend, I'm using _React_ with _Next.js_. Blogs are best statically rendered, and I wanna do proper SEO, which is something Next.js supports very well.
2. For my CMS, I'm using [Strapi](https://strapi.io/). Because I'm under time constraints, I did not wish to roll my own CMS - my main focus was on Next.js and Edge deployments (see next point).
   I configured it with Postgres, simply because it's something I've had some experience with before - although it doesn't really matter, since everything is handled by Strapi itself.
3. An object storage bucket is hosted on [Linode](https://linode.com). Honestly, the S3 dashboard confused the living hell out of me and, for time considerations, I decided to use Linode's service for this.
4. Everything is then deployed on [Railway](https://railway.app). I like their simple and straightforward way of doing any kind of edge deployments. It is my first time using it, and so far, it's a blast.

Things that I considered:

1. I considered hosting the frontend app on Vercel instead of Railway, since it provides better metrics. In the interest of keeping it simple, I decided to deploy everything in the same place, but this might change in the future.
2. _Using Sveltekit_ was definitely an option. I love Svelte and its revolutionary approach to the way it handles client-side JS. However, I know Next and React decently well, so I decided to eventually go with that instead.
3. Astro looked interesting, but I haven't had the time to look into it.

Thank you for reading! I hope you enjoy your stay, and find my writing interesting.
