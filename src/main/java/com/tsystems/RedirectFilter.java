package com.tsystems;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

/**
 * Created by agurylev on 08.04.2016.
 */
public class RedirectFilter implements Filter {
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest req = (HttpServletRequest) request;
        String path = req.getRequestURI().substring(req.getContextPath().length());

        if (path.startsWith("/partials") || path.startsWith("/assets")) {
            request.getRequestDispatcher(path).forward(request, response); // Goes to controller servlet.
        } else {
            request.getRequestDispatcher("/").forward(request, response); // Goes to controller servlet.
        }
    }

    public void destroy() {

    }
}
