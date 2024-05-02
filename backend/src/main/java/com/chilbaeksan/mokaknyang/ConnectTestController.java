package com.chilbaeksan.mokaknyang;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
public class ConnectTestController {
    @GetMapping("/test")
    public ResponseEntity ConnectTest(){
       log.info("연결 확인");
        return null;
    }
}
