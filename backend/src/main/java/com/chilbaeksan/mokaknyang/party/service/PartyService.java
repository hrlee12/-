package com.chilbaeksan.mokaknyang.party.service;

import com.chilbaeksan.mokaknyang.party.domain.Party;
import com.chilbaeksan.mokaknyang.party.dto.request.PartyRegist;
import com.chilbaeksan.mokaknyang.party.repository.PartyRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class PartyService {
    private final PartyRepository partyRepository;

    public Party registParty(PartyRegist partyRegist){
        Party party = Party.builder()
                .name(partyRegist.getPartyName())
                .inviteMessage(partyRegist.getPartyInviteMessage())
                .maxNumber(partyRegist.getPartyMaxNumber())
                .participateNumber(partyRegist.getPartyParticipateNumber())
                .build();

        return partyRepository.save(party);
    }
}
