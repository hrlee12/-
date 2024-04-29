package com.chilbaeksan.mokaknyang.exception;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.lang.reflect.Executable;

@RestControllerAdvice
public class GlobalExceptionHandler {
    // 서버가 내보내는 에러는 아래에서 처리
    @ExceptionHandler(BaseException.class)
    public ResponseEntity<ErrorResponse> handleBaseException(BaseException ex){
        return ResponseEntity.status(ex.getErrorCode().getResultCode())
                .body(new ErrorResponse(ex.getErrorCode().getResultCode(), ex.getErrorCode().getMessage()));
    }
}
