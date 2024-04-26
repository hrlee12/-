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

    // 나머지는 전부 서버 에러로 처리
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleBaseException(Exception ex){
        ErrorResponse errorResponse = new ErrorResponse(ErrorCode.INTERNAL_SERVER_ERROR.getResultCode(), ErrorCode.INTERNAL_SERVER_ERROR.getMessage());
        return ResponseEntity.status(errorResponse.getResultCode())
                .body(errorResponse);
    }

}
