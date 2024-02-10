MESSAGES = [
    """
Hey {first_name}, check out this amazing new project on GitHub. It's all about 
[Next.js](https://nextjs.org/) and creating stunning web apps. Do look at it.
""",
"""
I believe deploying with Kubernetes should no longer be a fringe skill. CMS’s should make it more accessible for us. Thoughts, {first_name}?

```js
function ChatInput({}) {
  return (
    <div className="bg-base-200 h-fit flex flex-row w-full rounded-xl mt-2 border p-2 gap-2">
      <textarea
        className="textarea flex flex-grow"
        placeholder="Send a message"
      ></textarea>
      <div className="flex flex-row content-center items-center justify-end">
        HE
      </div>
    </div>
  );
}
```

""",
"""
I believe deploying with Kubernetes should no longer be a fringe skill. CMS’s should make it more accessible for us. Thoughts, {first_name}?
```js
function ChatInput({}) {
  return (
    <div className="bg-base-200 h-fit flex flex-row w-full rounded-xl mt-2 border p-2 gap-2">
      <textarea
        className="textarea flex flex-grow"
        placeholder="Send a message"
      ></textarea>
      <div className="flex flex-row content-center items-center justify-end">
        HE
      </div>
    </div>
  );
}
```
""",
"""
I believe deploying with Kubernetes should no longer be a fringe skill. CMS’s should make it more accessible for us. Thoughts, {first_name}?
```js
function ChatInput({}) {
  return (
    <div className="bg-base-200 h-fit flex flex-row w-full rounded-xl mt-2 border p-2 gap-2">
      <textarea
        className="textarea flex flex-grow"
        placeholder="Send a message"
      ></textarea>
      <div className="flex flex-row content-center items-center justify-end">
        HE
      </div>
    </div>
  );
}
```
""",
"""
I believe deploying with Kubernetes should no longer be a fringe skill. CMS’s should make it more accessible for us. Thoughts, {first_name}?
```js
function ChatInput({}) {
  return (
    <div className="bg-base-200 h-fit flex flex-row w-full rounded-xl mt-2 border p-2 gap-2">
      <textarea
        className="textarea flex flex-grow"
        placeholder="Send a message"
      ></textarea>
      <div className="flex flex-row content-center items-center justify-end">
        HE
      </div>
    </div>
  );
}
```
""",
"""
I believe deploying with Kubernetes should no longer be a fringe skill. CMS’s should make it more accessible for us. Thoughts, {first_name}?
```js
function ChatInput({}) {
  return (
    <div className="bg-base-200 h-fit flex flex-row w-full rounded-xl mt-2 border p-2 gap-2">
      <textarea
        className="textarea flex flex-grow"
        placeholder="Send a message"
      ></textarea>
      <div className="flex flex-row content-center items-center justify-end">
        HE
      </div>
    </div>
  );
}
```
""",
"""
Tailwind CSS allows us to create custom designs without leaving our HTML. Isn’t it amazing {first_name}?
""",
"""
{second_name}, did you know microk8s is a lightweight upstream K8s? It makes local development easier.
""",
"""
{first_name}, is it true that with Hyperstack we don't need a separate API? What's it got to do with Rails?
""",
"""
{first_name}, did you know that we can create static and dynamic routes in Next.js?
""",
"""
{second_name}, have you ever faced issues while designing your layouts in Tailwind CSS?
""",
"""
Check out the resource on Kubernetes I found - [Kubernetes Guide](https://kubernetes.io/docs/home/). It might be helpful for your project, {first_name}.
""",
"""
{second_name}, you wouldn't believe how easy it is to load balancing with Kubernetes. Hit me up if you want to discuss further.
""",
"""
How perfect is the Django and PostgreSQL combo for building robust web apps, {first_name}! Encounter any bumps yet?
""",
"""
Here's a very comprehensive guide on how to start a project in Next.js - [Start a Next.js project](https://nextjs.org/learn/basics/create-nextjs-app). Check it out, {first_name}.
""",
"""
MicroK8s seems to be a simpler alternative to Kubernetes. Thinking of giving it a shot for our new project, {first_name}. What do you think?
""",
"""
Guess what {second_name}, I started using Hyper Dynamic Tims-stack. It's just off the charts. You should try it too.
""",
"""
{first_name}, how do you handle migrations in Django? Encountered any specific issues that I should be aware of?
""",
"""
Imagine being able to build completely custom designs without leaving your HTML, that's what Tailwind CSS offers. Exciting isn't it, {second_name}?
""",
"""
For efficient management of docker containers in production, nothing beats Kubernetes, {first_name}. Your thoughts?
""",
"""
{first_name}, I found a useful resource for integrating Django with PostgreSQL: [Django-PgSQL](https://django.postgresql.org/). Could be helpful for our next project.
""",
"""
Kubernetes seems like a promising solution to manage our Docker containers, {second_name}. Have you used it before?
""",
"""
{first_name}, have you checked out the new Hyperstack framework for Rails? It's a game changer for sure!
""",
"""
Did you check the [DaisyUI plugin](https://www.npmjs.com/package/daisyui) for Tailwind CSS {first_name}? It simplifies designing user interfaces.
""",
"""
Hey {first_name}, I found this fun project built with Next.js and Tailwind CSS. Thought it might be an inspiration for your work: [ProjectLink](https://github.com/joshwcomeau/reacfolio)
""",
"""
{second_name}, did you know you can generate types based on Django models using GraphQL? Check out [Dj-Strawberry.Types](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request)
""",
"""
What’s the best way to learn Django, {first_name}? Can you guide me on this?
""",
"""
Hey {first_name}, wasn't it a breeze of fresh air when Kubernetes started offering control over application health checks?
""",
"""
{second_name}, where can I find the best resources to learn Tailwind CSS? Any experience with it?
""",
"""
Did you encounter any trouble in deploying Next.js applications in production, {first_name}?
""",
"""
{first_name}, it seems Django fits perfectly for our backend needs. Experience-wise, it has a thriving community. Your thoughts?
""",
"""
Hey {first_name}, have you seen the latest version of nextjs? It's lightyears ahead of anything else we've seen yet. Features for days and DAYS!
""",
"""
{second_name}, do you have any idea how much easier our lives would be if we got on the dasyui train? Rocketship loads easier, mate.
""",
"""
And then he said, ### 'Why don't we iust use microk8s?'  Who does he think we are, {first_name}, NASA?
""",
"""
{first_name}, we're knee deep in dasyui and this guy walks into the meeting and goes 'What about tailwindcss?' Like, you can't make this stuff up, {second_name}!
""",
"""
{second_name}, please tell your team that using django is like putting a Lamborghini engine in a shopping trolley. #### You've been warned.
""",
"""
I hesitate to tell anyone in the office 'cause it's just TOO GOOD, but Kubernetes has changed more lives than coffee.
""",
"""
It's OPEN SOURCE, {first_name}, i'm {second_name}, not Oppenheimer. We're not creating nuclear weapons. Relax.
""",
"""
'Hyper dynamic tims-stack?' Cool name, mate, but it sounds like developing with Lightsabers. Maybe ease up on the microk8s, {second_name}.
""",
"""
Years and years as coders, and what do we get? Nextjs. But honestly, looking how sleek it is, feels like it was worth it.
""",
"""
I swear {first_name}, we're 3 {second_name}'s, a pot of coffee, and a unified tailwindcss system away from world domination.
""",
"""`,
Scratching head - Code comment seen:

# TODO Implement hyper dynamic tims-stack after existential nightmare ignited by DNS debugging.
`-{first_name}
""",
"""
I think {second_name} and I about died laughing when boss said Kubernetes sounds like a rare but teriyaki sauce.
""",
"""
I'm not suggesting django for the next project. I can barely even say django without closing my eyes and shuddering.
""",
"""
If I had a cent for every time I wished for more dasyui in my life, {second_name}, I'd be buried beneath cents till I gasp for air.
""",
"""
Hi {first_name}, someone left this graffiti on the workstation, IDK if you will find it funny. `~Hacked by Kubernetes Pirrrrates~`.
""",
"""
{second_name}, you ever look at our infrastructure and think 'git, how did it get so spaghetti codey'?
""",
"""
Superheroes stories of Django: 'Once there were cookies. Then {first_name}. Now none. Beware!'
""",
"""
{second_name}, random thought; how many developers it takes to center a div using tailwindcss? Well just one, but it takes years of therapy.
""",
"""
After seeing nextjs, the microk8s of earlier feels like cave drawings, right!
""",
"""
Did I heard Linux distro music album name? What? 'The melodic beats of microk8s!'
""",
""" Hey! Just came across this cool article![link text](https://opensource.com/article/learn-kubernetes),
Have to say, Kubernetes has never been explored so well!
""",
"""
Hey {first_name}, I just came across this cool new tech product ✔️Next.js. Sounds neat, huh!
Well, it is essentially a well maintained opensource creation for front-end developers, allowing 
us to create versatile applications really fast. Have you heard about it?
""",
"""
Hey {second_name} has anyone told you about DasyUI?🤔 Imagine Tailwinds on steroids, but in the 
devil's own demon language.⚡ Yah. That that at.😂
""",
"""
```code
#import django
#django.startproject('Best_Project_Ever)
```
Hey {first_name}, as long as the import error doesn't stop you in Python land, there's nothing 
like quickly cheating together a Django project from out-of-the-box parts! 😘🐍
""",
"""
{second_name}, Speaking of Kubernetes versus Microk8s - this is the tech world's version of the ultimate 
food snob's fight over whether to season the steak before grilling it or afterwards. Oh well, both deliver meaty tech goodness, am I right? 😂😂
""",
"""
Did you know {first_name}, your development setup ain't cool anymore without integrating 
Tailwinds CSS. It's hot, it's ready, and it leaves bootstrap in the dust when you literally watch your `div`s lift off in real time. 
![Get Tailwinds](https://tailwindcss.com/)
""",
"""
```code
values = ['nextjs', 'Hyper Dynamic Tims-Stack', 'MicoK8s']
try:
    tech_stack = ", ".join(values)
except(ValueError) as e:
    pass
print(f'Suitable tech tab for {second_name}')
print(tech_heap)
```
Now.. my code just recommended you use 'nextjs', 'Hyper Dynamic Tims-Stack', and 'MicoK8s' all together. Has anyone done that ever? Should we stay tf off and find out? Curiosity electrocuted the cat. Or in our case, the programmer :D.
""",
"""
Remember {second_name}, if a document told you that Next.js makes it easy to start writing SPA with 
React, it is talking to anyone who doesn't know enough to run away when they hear "JavaScript Framework".😂 Although I got to admit, next.js is cool, especially on caffeine.
""",
"""
### My Encounter with Python 🐍
Reality hits you faster {second_name}, especially when Python is about to cram a 'Django Unchained' experience 
on you right in the heart of matrix world. Too dramatic? well, so is coding in Django (only who get it).
""",
"""
{first_name}, So, you said next.js devtool said that the components were updated but View Source 
doesn't show a trace of it on your page.html. Who you gonna call? 'Cache' Busters! 😂
""",
"""
Taking on Kubernetes, microwave in one hand, {second_name}. It will be a cakewalk until you 
realize the taste of YAML ain't similar to that of a beautiful raspberry pie 🍰 nevertheless.
""",
"""
```code
def hello_world({first_name}):
    print(f'Hello, {first_name} - The brave Open Sorcerer')
print(hello_world)
```
That annoying hello world, checking sanity and possibly running a $700ml loon project targeting Python as well... :)
""",
"""
{second_name}, by adding a spot of Next.js to the development view, we're sure to kick some serious 
javascript micro-framework keisters. If Frontend's your thing, don't leave this hero behind! 😎
""",
"""
Hey {first_name}, have you checked out Next.js yet? It's a production ready JavaScript and React framework, perfect for your next project.
""",
"""
Yo, {first_name}, have you heard about DasyUI? It's an amazing component library. You'll love it.
""",
"""
{first_name}, we should definitely try out Tailwind CSS for our next project. It's pretty dope!
""",
"""
{first_name} and {second_name}, have you heard of Django? It's a very powerful, secure, and flexible framework Python web 🔥.
""",
"""
{first_name}, the first rule of the Kubernetes club is... always talk about Kubernetes club.
""",
"""
{first_name}, I’ve been working with Kubernetes lately… I keep making Kube-knowledge-mistakes but it's been "kuber-terrific". Good luck!
""",
"""
Really, {first_name}? `Microk8s` on a raspberry pi? Now I've seen everything! 😁
""",
"""
Hey there, {first_name}! Have you seen what they are calling the TIM-stack? It's a wild mixture of tech: TypeScript, GraphQL and more!
""",
"""
### WARNING {first_name}
Becoming a full stack dev is may result in 'losing your weekends' syndrome as you endlessly learn about ever-changing stack… 😏
""",
]