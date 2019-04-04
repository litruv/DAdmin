<h1 align="center">
  <br>
  <a href="https://github.com/litruv/DAdmin/"><img src="https://litruv.com/resources/dadmin.jpg" alt="DAdmin - Discord Bot"></a>
  <br>
  DAdmin 
  <br>
</h1>
<h3 align="center">
Administration bot for Discord  Server automation
</h3>

Overview
-----
**DAdmin** is a [Discord.js](https://discord.js.org/) bot, designed to be easy to modify, and not have to reset while making/modifying commands and plugins

 
<h2>Admin Commands</h2>

<strong>Change <span tabindex="0" class="mention wrapperHover-1GktnT wrapper-3WhCwL" role="button">@DAdmin</span>~s Name</strong> - <em>Changes the bots name on the server</em> 
     <pre><code class="scrollbarGhost-2F9Zj2 scrollbar-3dvm_9 hljs apache">~<span class="hljs-attribute">botname</span> 
<span class="hljs-section">&lt;new-name&gt;</span></code></pre>
<strong>Change Prefix</strong> - <em>Changes the bots prefix for the server</em> 
     <pre><code class="scrollbarGhost-2F9Zj2 scrollbar-3dvm_9 hljs apache">~<span class="hljs-attribute">changeprefix</span> / ~prefix 
<span class="hljs-section">&lt;new-prefix&gt;</span></code></pre>
<strong>Clear Messages</strong> - <em>Clears messages from the channel</em> 
     <pre><code class="scrollbarGhost-2F9Zj2 scrollbar-3dvm_9 hljs apache">~<span class="hljs-attribute">clear</span> 
<span class="hljs-section">&lt;number&gt;</span></code></pre>
<strong>Get auto parent</strong> - <em>gets the auto creation channel</em> 
     <pre><code class="scrollbarGhost-2F9Zj2 scrollbar-3dvm_9 hljs apache">~<span class="hljs-attribute">getautoparent</span> </code></pre>
<strong>Get auto voice</strong> - <em>Set the auto-sorting channel</em> 
     <pre><code class="scrollbarGhost-2F9Zj2 scrollbar-3dvm_9 hljs apache">~<span class="hljs-attribute">getautovoice</span> </code></pre>
<strong>Kick</strong> - <em>Kicks users from the voice channel</em> 
     <pre><code class="scrollbarGhost-2F9Zj2 scrollbar-3dvm_9 hljs apache">~<span class="hljs-attribute">kick</span> 
<span class="hljs-section">&lt;@Tag&gt;</span></code></pre>
<strong>Move all</strong> - <em>Moves all people from one Voice Chat, to the next</em> 
     <pre><code class="scrollbarGhost-2F9Zj2 scrollbar-3dvm_9 hljs apache">~<span class="hljs-attribute">moveall</span> 
<span class="hljs-section">&lt;ChannelID&gt;</span><span class="hljs-section">&lt;ChannelID&gt;</span></code></pre>
<strong>Permissions</strong> - <em>Check permissions for user</em> 
     <pre><code class="scrollbarGhost-2F9Zj2 scrollbar-3dvm_9 hljs apache">~<span class="hljs-attribute">permissions</span> 
<span class="hljs-section">&lt;@Tag&gt;</span></code></pre>
<strong>Set auto parent</strong> - <em>sets the auto creation category</em> 
     <pre><code class="scrollbarGhost-2F9Zj2 scrollbar-3dvm_9 hljs apache">~<span class="hljs-attribute">setautoparent</span> 
<span class="hljs-section">&lt;VChannelID&gt;</span></code></pre>
<strong>Set auto voice</strong> - <em>Sets the auto-sorting voice channel</em> 
     <pre><code class="scrollbarGhost-2F9Zj2 scrollbar-3dvm_9 hljs apache">~<span class="hljs-attribute">setautovoice</span> 
<span class="hljs-section">&lt;VChannelID&gt;</span></code></pre>
<strong>Slap</strong> - <em>Slaps users to empty channels and back again</em> 
     <pre><code class="scrollbarGhost-2F9Zj2 scrollbar-3dvm_9 hljs apache">~<span class="hljs-attribute">slap</span> 
<span class="hljs-section">&lt;@Tag&gt;</span></code></pre>

  <br>
<h2>General Commands</h2>

<strong>Anagram Finder</strong> - <em>finds anagrams up to 9 letters</em> 
     <pre><code class="scrollbarGhost-2F9Zj2 scrollbar-3dvm_9 hljs apache">~<span class="hljs-attribute">anagram</span> / ~nagaram 
<span class="hljs-section">&lt;letters&gt;</span></code></pre>
<strong>Self Diagnosis</strong> - <em>What cancer do you have today?</em> 
     <pre><code class="scrollbarGhost-2F9Zj2 scrollbar-3dvm_9 hljs apache">~<span class="hljs-attribute">diagnose</span> / ~webmd </code></pre>
<strong>Help file</strong> - <em>Runs this help menu</em> 
     <pre><code class="scrollbarGhost-2F9Zj2 scrollbar-3dvm_9 hljs apache">~<span class="hljs-attribute">help</span> / ~? 
<span class="hljs-section">&lt;(general)/music/admin&gt;</span></code></pre>
<strong>insult</strong> - <em>Fresh insults directed at whoever you want</em> 
     <pre><code class="scrollbarGhost-2F9Zj2 scrollbar-3dvm_9 hljs apache">~<span class="hljs-attribute">insult</span> </code></pre>
<strong>joke</strong> - <em>Fresh dad jokes from reddit.com/r/dadjokes</em> 
     <pre><code class="scrollbarGhost-2F9Zj2 scrollbar-3dvm_9 hljs apache">~<span class="hljs-attribute">joke</span> </code></pre>
<strong>Battlestations</strong> - <em>Inserts battlestation from reddit/r/battlestations</em> 
     <pre><code class="scrollbarGhost-2F9Zj2 scrollbar-3dvm_9 hljs apache">~<span class="hljs-attribute">battlestations</span> / ~battlestation </code></pre>
<strong>Doggo</strong> - <em>Inserts good boye from reddit/r/doggos</em> 
     <pre><code class="scrollbarGhost-2F9Zj2 scrollbar-3dvm_9 hljs apache">~<span class="hljs-attribute">doggo</span> </code></pre>
<strong>Kitty</strong> - <em>Inserts good boye from reddit/r/cats</em> 
     <pre><code class="scrollbarGhost-2F9Zj2 scrollbar-3dvm_9 hljs apache">~<span class="hljs-attribute">kitty</span> </code></pre>
<strong>Lizard</strong> - <em>Inserts good boye from reddit/r/lizards</em> 
     <pre><code class="scrollbarGhost-2F9Zj2 scrollbar-3dvm_9 hljs apache">~<span class="hljs-attribute">lizard</span> </code></pre>
<strong>Mlem</strong> - <em>Inserts good boye from reddit/r/mlem</em> 
     <pre><code class="scrollbarGhost-2F9Zj2 scrollbar-3dvm_9 hljs apache">~<span class="hljs-attribute">mlem</span> </code></pre>
<strong>Sloth</strong> - <em>Inserts good boye from reddit/r/sloths</em> 
     <pre><code class="scrollbarGhost-2F9Zj2 scrollbar-3dvm_9 hljs apache">~<span class="hljs-attribute">sloth</span> </code></pre>
<strong>Stats for DAdmin</strong> - <em>Metrics on DAdmin, uptime, users, servers</em> 
     <pre><code class="scrollbarGhost-2F9Zj2 scrollbar-3dvm_9 hljs apache">~<span class="hljs-attribute">stats</span> </code></pre>