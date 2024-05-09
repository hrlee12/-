package com.chilbaeksan.mokaknyang.member.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MemberMyInfoResponseDto {
   private Integer memberExp;
   private String memberCreatedAt;
   private String memberCatName;
   private Integer memberHitNumber;
   private Integer memberBehitNumber;
   private String memberGoal;
   private Integer level;
   private String titleContent;
   private Integer catId;
}
