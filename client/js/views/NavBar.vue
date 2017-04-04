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
	        <router-link tag="li" to="/" activeClass="active"><a>Home</a></router-link>
	        <router-link tag="li" to="/help" activeClass="active"><a>Help</a></router-link>
	      </ul>
	      <ul class="nav navbar-nav navbar-right">
	        <router-link v-if="!isAuthenticated" tag="li" to="/login" activeClass="active"><a>Log In</a></router-link>
	        <li v-if="isAuthenticated"><button @click.prevent="logout">Log Out</button></li>
	        <router-link tag="li" to="/register" activeClass="active"><a>Register</a></router-link>	        
	      </ul>
	    </div><!--/.nav-collapse -->
	  </div><!--/.container-fluid -->
	</nav>	
</template>

<script type="text/javascript">
	export default {
		props: ["isAuthenticated"],
		methods: {
			logout() {
				localStorage.removeItem("token");
			}
		}
	}
</script>