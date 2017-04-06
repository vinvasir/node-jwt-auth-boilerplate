<template>
	<!-- Static navbar -->
	<nav class="navbar navbar-default">
	  <div class="container-fluid">
	    <div class="navbar-header">
	      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
	        <span class="sr-only">Toggle navigation</span>
	        <span class="icon-bar"></span>
	        <span class="icon-bar"></span>
	        <span class="icon-bar"></span>
	      </button>
	      <a class="navbar-brand" href="/">Node/Vue Auth</a>
	    </div>
	    <div id="navbar" class="navbar-collapse collapse">
	      <ul class="nav navbar-nav">
	       <li><a href="/">Home</a></li>
	       <router-link to="/help" tag="li" activeClass="active"><a>Help</a></router-link>
	      </ul>
	      <ul class="nav navbar-nav navbar-right">
	        <li v-if="!currentUser"><a href="/auth/login">Log In</a></li>
	        <li v-if="currentUser"><a href="/auth/logout">Log Out</a></li>
	        <li v-if="!currentUser"><a href="/auth/register">Register</a></li>	        
	      </ul>
	    </div><!--/.nav-collapse -->
	  </div><!--/.container-fluid -->
	</nav>	
</template>

<script type="text/javascript">
	export default {
		props: ["currentUser"],
		methods: {
			logout() {
				localStorage.removeItem("token");
			}
		}
	}
</script>