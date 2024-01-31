spring boot configures spring security by default:
* requires the authenticated user for all endpoints including(boot's /error endpoint)
* registers a default user with a generated password at startup 
* protects password storage with BCrypt
* provides form based login and logout
*  Protection against CSRF attacks, Session fixation attacks, X-Frame-options for Clickjacking.

Using @EnbaleWebsecurity tells spring boot to add spring security filter chain for every request.

The container creates filterchain made up of Filter instances and the servelt that will process the request/reponse.

 Filters can be used to :
 * Prevent downstream Filter instances or the Servlet from being invoked. in this case the filter writes the httpServletResponse.
 * Modifies the httpServeltResponse/HttpServletRequest before reaching the filters/servlet that follows.
```Java
public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) {
	// do something before the rest of the application
    chain.doFilter(request, response); // invoke the rest of the application
    // do something after the rest of the application
}

```

The servlet container is not aware of spring beans so to register beans as servlet filters spring uses FilterChainProxy to delegates filtering to it's own filterchain beans.
also fillerchainProxy detremines when a SecurityFilterChain should be invoked by any property in the HttpServletRequest By using the RequestMatcher interface.

Spring security enable us to configure multiple SecurityFilterChain Beans each one contains Filter instances.
These filter are put in the FilterChainProxy that will invoke them based on RequestMatcher on the HttpServletRequest
each Filter instance can be used for exploit protection or Auth/Auhorization and more.

Example: https://docs.spring.io/spring-security/reference/servlet/architecture.html#servlet-security-filters

Spring Security provides comprehensive logging of all security related events at the DEBUG and TRACE level. This can be very useful when debugging your application because for security measures Spring Security does not add any detail of why a request has been rejected to the response body. If you come across a 401 or 403 error, it is very likely that you will find a log message that will help you understand what is going on.

With spring security we can add our own custom filters to the filterChain by implementing Filter interface or extending OncePerRequestFilter.

Example : https://docs.spring.io/spring-security/reference/servlet/architecture.html#adding-custom-filter

 ## Spring authentication architecture
 ![Screenshot from 2024-01-06 12-19-31.png](..%2F..%2F..%2F..%2FPictures%2FScreenshots%2FScreenshot%20from%202024-01-06%2012-19-31.png)
 ### SecurityContextHolder
it contains the SecurityContext
This is where spring secrutity stores the details of who's authenticated 

The simplest way to indicate that a user is authenticated is :

```java

SecurityContext context = SecurityContextHolder.createEmptyContext();
Authentication authentication =
        new TestingAuthenticationToken("username", "password", "ROLE_USER"); 
context.setAuthentication(authentication);

SecurityContextHolder.setContext(context);

```
1. Docs recommend to create a new empty SecutrityContext instance instead of  SecurityContextHolder.getContext().setAuthentication(authentication) to avoid race conditions across multiple threads
2. Then we create an Authentication object like a simple TestingAuthentication instance or for production use **UsernamePasswordAuthenticationToken(userDetails, password, authorities)**
3. 	Finally, we set the SecurityContext on the SecurityContextHolder. Spring Security uses this information for authorization.


To obtain information on the authenticated use access the securitycontext

```java
SecurityContext context = SecurityContextHolder.getContext();
Authentication authentication = context.getAuthentication();
String username = authentication.getName();
Object principal = authentication.getPrincipal();
Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
```

## SecurityContext
This is obtained from SecurityContextHolder and contains an Authentication object


## Authentication interface 

serves two purposes: 
* an input to AuthenticationManager to provide the credentials a user has provided when authenticated
* Represents the currently authenticated user. you can can obtain the current Authentication from SecurtyContext.

it contains
The Authentication contains:

* principal: Identifies the user. When authenticating with a username/password this is often an instance of UserDetails.

* credentials: Often a password. In many cases, this is cleared after the user is authenticated, to ensure that it is not leaked.

* authorities: The GrantedAuthority instances are high-level permissions the user is granted. Two examples are roles and scopes.
## GrantedAuthority
Check later
## Authentication Manager
is the api that defines how spring security filters preform authentication.The Authentication returned by the authentciate method is set on the SecurityContext.
The spring security Filter instances invoke the AuthenticationManager 
## ProviderManager 
The most commonly used implementation of Authentication Manager
## AuthenticationProvider
we can inject multiple instances of AuthenticationProvider in the a ProviderManager.
Example: DaoAuthenticationProvider supports username/password authentication.
We set u a UserDetailsService implementation and a password encoder instance
