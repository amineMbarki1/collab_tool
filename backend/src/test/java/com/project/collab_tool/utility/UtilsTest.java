package com.project.collab_tool.utility;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

public class UtilsTest {


    @Test
    public void Utils_ValidateString_ReturnsTrueIfStringNotNullAndNotEmptyElseFalse() {
        String s1 = null;
        String s2 = "";
        String s3 = "Hello Sir";


        Assertions.assertFalse(Utils.validateString(s1));
        Assertions.assertTrue(Utils.validateString(s3));
        Assertions.assertFalse(Utils.validateString(s2));

    }


}
