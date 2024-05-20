package com.chilbaeksan.mokaknyang.attack.dto.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AttackRegist {
    private Integer attackSituationId;
    private Integer hitMember;
    private Integer behitMember;
}
