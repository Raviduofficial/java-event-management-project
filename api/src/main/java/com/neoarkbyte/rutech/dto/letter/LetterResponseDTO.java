package com.neoarkbyte.rutech.dto.letter;

import com.neoarkbyte.rutech.type.STATUS;
import lombok.Data;

@Data
public class LetterResponseDTO {
    private String letterId;
    private String letterTitle;
    private String letterDescription;
    private String letterUrl;
    private STATUS status;
    private String rejectMessage;
}
