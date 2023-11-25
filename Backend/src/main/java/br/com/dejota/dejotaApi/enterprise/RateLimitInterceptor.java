package br.com.dejota.dejotaApi.enterprise;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import java.util.concurrent.TimeUnit;

@Component
public class RateLimitInterceptor implements HandlerInterceptor {

    private static final int MAX_REQUESTS_PER_HOUR = 550;

    private final RedisTemplate<String, String> redisTemplate;

    @Autowired
    public RateLimitInterceptor(RedisTemplate<String, String> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String clientId = getClientId(request);
        String requestCountKey = clientId + ":requests";
        Long requests = redisTemplate.opsForValue().increment(requestCountKey, 1);
        if (requests == 1) {
            redisTemplate.expire(requestCountKey, 1, TimeUnit.HOURS);
        }
        if (requests > MAX_REQUESTS_PER_HOUR) {
            response.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
            return false;
        }
        return true;
    }
    private String getClientId(HttpServletRequest request) {
        return request.getRemoteAddr();
    }
}
