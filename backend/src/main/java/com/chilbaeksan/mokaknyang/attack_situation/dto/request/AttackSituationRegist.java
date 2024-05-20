package com.chilbaeksan.mokaknyang.attack_situation.dto.request;

import com.chilbaeksan.mokaknyang.attack_situation.domain.AttackSituationCode;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AttackSituationRegist {
    private Integer partyId;
    private AttackSituationCode attackSituationCode;
}
