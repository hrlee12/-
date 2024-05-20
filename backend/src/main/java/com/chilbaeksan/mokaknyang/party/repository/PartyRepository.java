package com.chilbaeksan.mokaknyang.party.repository;

import com.chilbaeksan.mokaknyang.party.domain.Party;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PartyRepository extends JpaRepository<Party, Integer> {
    Optional<Party> findByPartyId(Integer partyId);
}
