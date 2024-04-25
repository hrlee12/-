package com.chilbaeksan.mokaknyang.attack_situation.dto.request;

import com.chilbaeksan.mokaknyang.attack_situation.domain.AttackSituationCode;
import com.chilbaeksan.mokaknyang.group.domain.Group;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AttackSituationRegist {
    private Group group;
    private AttackSituationCode attackSituationCode;
}
