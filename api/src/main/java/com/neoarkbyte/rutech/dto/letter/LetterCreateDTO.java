package com.neoarkbyte.rutech.dto.letter;

import lombok.Data;

@Data
public class LetterCreateDTO {
    private String letterTitle;
    private String letterDescription;
    private String letterUrl;
    private String eventId;
}
