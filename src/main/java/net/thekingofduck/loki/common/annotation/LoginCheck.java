package net.thekingofduck.loki.common.annotation;

import java.lang.annotation.*;


@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target({ ElementType.METHOD})
@Deprecated
public @interface LoginCheck {
}
