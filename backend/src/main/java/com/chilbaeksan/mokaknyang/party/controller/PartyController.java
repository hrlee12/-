package com.chilbaeksan.mokaknyang.party.controller;

import com.chilbaeksan.mokaknyang.party.dto.request.PartyRegist;
import com.chilbaeksan.mokaknyang.party.dto.response.InvitePartyList;
import com.chilbaeksan.mokaknyang.party.service.PartyService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/party")
public class PartyController {
    private final PartyService partyService;

    @PostMapping
    public void registParty(@RequestBody PartyRegist partyRegist){
        partyService.registParty(partyRegist);
    }

    @GetMapping("/invited-list")
    public ResponseEntity<InvitePartyList> getInvitePartyList(HttpServletRequest httpServletRequest){
        InvitePartyList invitePartyList = partyService.getInviteGroupList(httpServletRequest);

        return ResponseEntity.ok(invitePartyList);
    }
}
