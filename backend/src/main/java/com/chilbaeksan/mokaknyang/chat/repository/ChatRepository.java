package com.chilbaeksan.mokaknyang.chat.repository;

import com.chilbaeksan.mokaknyang.chat.domain.ChatMessage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatRepository extends MongoRepository<ChatMessage, String> {
    Page<ChatMessage> findByPartyId(Integer partyId, Pageable pageable);
    ChatMessage findFirst1ByPartyIdOrderBySendTimeDesc(Integer partyId);

    Page<ChatMessage> findAllByPartyIdOrderBySendTimeDesc(Integer partyId, Pageable pageable);
}
