const PRINT_BOOT = [
  {
    textLine: "",
    wait: 2500,
  },
  {
    textLine: `***************************** БЕЗОПАСНАЯ КОММУНИКАЦИЯ v3.1.0 ******************************\n\n`,
    wait: 1000,
  },
  {
    textLine: `ЗАГРУЗОЧНАЯ СИСТЕМА ..............................\n`,
    wait: 1000,
  },
  {
    textLine: `СИСТЕМА ЗАГРУЗЕНА\n\n`,
    wait: 1000,
  },
  {
    textLine: `НАЧАЛО ПОСЛЕДОВАТЕЛЬНОСТИ БЕЗОПАСНОЙ СВЯЗИ .......\n`,
    wait: 1000,
  },
  {
    textLine: `
СИЛА: XX0022. ШИФРОВАНИЕ://000.222.2345
ПОПРОБУЙТЕ ПАРОЛЬ: ********* КОД: FSB ГАММА: 1___ ПРИОРИТЕТ 1
Сканирование портов...
СВЯЗЬ ФСБ (23.45.23.12.00000000)
СВЯЗЬ ФСБ (13.66.23.12.00110000)
СВЯЗЬ ФСБ (13.66.23.12.00110044)
Жду ответа`,
    wait: 5000,
  },
  {
    textLine: `
-----НАЧАТЬ ЗАПРОС СЕРТИФИКАТА-----
MIIFHDCCAwQCAQAwgZMxCzAJBgNVBAYTAlJVMRUwEwYDVQQIDAzQnNC+0YHQutCy
0LAxbTBrBgNVBAcMZNCk0LXQtNC10YDQsNC70YzQvdCw0Y8g0YHQu9GD0LbQsdCw
INCx0LXQt9C+0L/QsNGB0L3QvtGB0YLQuCDQoNC+0YHRgdC40LnRgdC60L7QuSDQ
pNC10LTQtdGA0LDRhtC40LgwggIiMA0GCSqGSIb3DQEBAQUAA4ICDwAwggIKAoIC
AQDKcSc8zYQiFG+9Dq5NMyYS0niEmml0K6Npi7+tBwEh69K8PhqFDqvLWkUKr2zn
wei8ap+sd+CrrzdBqFs3eoY+JQdHt0wwBJ/ra7F350Qts+kFJOXy63T5EaJnoS6P
XAmoZmnuw70pngSKt+7MWeEbBABLh9BQUkXgXzioSL96cA2OIAQjaZ/2XaBg7Tey
7EF9qEA1Nn4qKWtfxo7Sraj9H20qDnZZahPvPQQ1DqKd5w2SUFVoIXv6p49CUVMm
515sFG1v2FTIXb2IIox4apF0wk2G/O2davWE7tEy1VSBixnW07eP8gAGT5BKvxkp
16wOokI+X9pzfXg8zaQXOp7LYsJChf9MWDqNQfSEGyh+LbVFcHjIJ3V+E00Rl7vi
okBVdXNQ/XAuMprRQCGvQzNdbLKYA44BoBotLWXzzH+/RXMBvBVRCavVK8RvD/nj
Dnuvs93nHTGI4+bs6DDib+JqeXkUsO7OXoYdUfhlb2qsjFRCUjDsP2pa/ChX+OYB
orCSLTrE3jrzbs7UZFsmauqb9wf5f7CgClXVsgfbiDU2PiUT/V79lEMZmo7MLiWF
VmNQjEByayE4fOkaAK8vnkFNWrmvG+YgDPBJ3J1873+h8jk1eat+24hB8NaVh9Z2
20Mpu6UNTLPHjim6KPhRy/cFd9HUFSgAYbobfDVoC1/IrQIDAQABoEMwQQYJKoZI
hvcNAQkOMTQwMjAOBgNVHQ8BAf8EBAMCBaAwIAYDVR0lAQH/BBYwFAYIKwYBBQUH
AwEGCCsGAQUFBwMCMA0GCSqGSIb3DQEBCwUAA4ICAQAN1ckd9jvwahhNITBF5kf9
298SttkLjoEfoPB9f0Wq5erKZ8fRzLZiJfG5+5OaOaTDusw+Zy5HUd/Z8MWCdM/W
AJYuaesQ2I8fNE7rZJ3TSxDXgL9JlOAZNPt/XW+UJeZn2iGiLDk03sI22UhjzPJ1
VZAMmQwQ///0k4O7D6YBQJmBDoZBu5rnHYTO9P613pt8WL/KzZ2qwsxowomBUk0y
VnIm7pLEwiGWnmC6azzqeagNM7XmlxW5NKj/IAvm2pI8ecSVr12KiakpRnoYxANh
7rP01RUUIilZPK6Ug2OakoOKvqj1UDByXzofMyU6+ZjFSupdiBed7ljsUhlAV2gs
olBn63PWfo8OyXmEmeO6/mkOoDcE1RK1Hk9vIaWxuGfQ1LJgjOQaekQvGEd7Zqjp
Vp7HOg7TXoySM+h02f6wRlK/a1eOHIZGvCXNhTf3getxEM7iK/BfuoyMFt0jHNe8
3qTbEdN1J0TdTk271dcbBKYJZh3SkWonjW88dKp53llq/YHwBbHTli/k+MAshOPY
pgHF2/Dm8j16IUP3C+fb4R9P44E90i5n2zeo8zpltQlJuTwesZIyUQzbbzlvc9hu
HHlOo1GIv7NpC9LX3s9wDEqXu62npLE4th8pPtBAm59BR+OAa/5lQEDab7otH6No
ATPmw37LD3KKvpsNpopT8w==
-----ЗАВЕРШЕНИЕ ЗАПРОСА СЕРТИФИКАТА-----
    `,
    wait: 5000,
  },
];

const LOGIN_SUCCESS = `
write_block1:
  stc
  ret
write_block endp
init_buffs proc near
  call	read_block
  xor	ax,ax
  mov	output_ptr,ax
  ret
init_buffs endp
flush_buffs proc near
  mov	cx,output_ptr
  or	cx,cx
  jz	flush_buffs1
  mov	bx,output_handle
  mov	dx,offset output_buffer
  mov	ah,40h
  int	21h
  cmp	ax,output_ptr
  jnz	flush_buffs2
flush_buffs1: 
  clc
  ret
flush_buffs2:
  stc
  ret
flush_buffs endp
sign_on proc	near
  mov	dx,offset msg6
  mov	ah,9
  int	21h
  mov	dx,offset msg7
  mov	ah,9
  int	21h
  mov	dx,offset input_name
  call	pasciiz
  mov	dx,offset msg8
  mov	ah,9
  int	21h
  mov	dx,offset output_name
  call	pasciiz
  mov	dx,offset msg9
  mov	ah,9
  int	21h
  ret
sign_on	endp

MCP/> DEPLOY CLU
SCAN: __ 0100.0000.0554.0080
SCAN: __ 0020.0000.0553.0080
SCAN: __ 0001.0000.0554.0550
SCAN: __ 0012.0000.0553.0030
SCAN: __ 0100.0000.0554.0080
SCAN: __ 0020.0000.0553.0080
`;

export { PRINT_BOOT, LOGIN_SUCCESS };
