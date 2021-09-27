export const mappings = {
  commit: {
    id: "999aaca",
    fullId: "999aacad0bae3080cd1e15d784c3ce9506abcac5",
    filePath: "lunar/ax/IlIllIlIlIlIIllIIIlIlIllI"
  },
  LTFolder: [
    "Scripts\\",
    "Scripts\\checkCommitId.txt",
    "Scripts\\replace1.txt",
    "Scripts\\replace2.txt",
    "Temp\\",
    "Temp\\file.txt",
    "assembly.txt",
    "recaf.jar"
  ],
  patchs: {
    freelook: [
      {
        patchType: "replace",
        scripts: {
          searchFor: "replace1.txt",
          replaceWith: "replace2.txt"
        },
        path: "lunar/bT/IlIllIlIlIlIIllIIIlIlIllI",
        methodName: "lllIIllIIlIIlIIIlllIlIIlI()Z",
        searchFor: `LDC "hypixel.net"`,
        replaceWith: `LDC "Cy0ze#4757"`
      },
      {
        patchType: "replace",
        scripts: {
          searchFor: "replace1.txt",
          replaceWith: "replace2.txt"
        },
        path: "lunar/cR/IIIIllIIlIIllIlIlIlllllll",
        methodName: "IlIllIlIlIlIIllIIIlIlIllI(Ljava/lang/String;)Z",
        searchFor: `LDC "hypixel.net"`,
        replaceWith: `LDC "Cy0ze#4757"`
      },
      {
        patchType: "replace",
        scripts: {
          searchFor: "replace1.txt",
          replaceWith: "replace2.txt"
        },
        path: "lunar/dH/IIlIlIlllIllllIlIIllIlllI",
        methodName: "<clinit>()V",
        searchFor: `LDC "Hypixel BungeeCord"`,
        replaceWith: `LDC "Cy0ze#4757"`
      },
      {
        patchType: "replace",
        scripts: {
          searchFor: "replace1.txt",
          replaceWith: "replace2.txt"
        },
        path: "lunar/dH/lllIIlIIIIIllIIIlllIlIIII",
        methodName: "IlIllIlIlIlIIllIIIlIlIllI()V",
        searchFor: `LDC "hypixel.net"`,
        replaceWith: `LDC "Cy0ze#4757"`
      }
    ],
    pinnedServers: [
      {
        patchType: "replace",
        scripts: {
          searchFor: "replace1.txt",
          replaceWith: "replace2.txt"
        },
        path: "lunar/cX/lIlIIIlllIllIllllllIIIIII",
        methodName: "IlIllIlIlIlIIllIIIlIlIllI()Ljava/util/Set;",
        searchFor: `A:
LINE A 16
NEW java/util/LinkedHashSet
DUP
NEW lunar/dn/IlIllIlIlIlIIllIIIlIlIllI
DUP
LDC "Lunar Network"
LDC "lunar.gg"
LDC -1L
B:
LINE B 18
INVOKESTATIC java/lang/Long.valueOf(J)Ljava/lang/Long;
GETSTATIC lunar/fX/IlIllIlIlIlIIllIIIlIlIllI.IlIllIlIlIlIIllIIIlIlIllI Llunar/fX/IlIllIlIlIlIIllIIIlIlIllI;
GETSTATIC lunar/fX/IlIllIlIlIlIIllIIIlIlIllI.llIIIIlllIIIlIlllIlllIlIl Llunar/fX/IlIllIlIlIlIIllIIIlIlIllI;
INVOKESTATIC com/google/common/collect/ImmutableList.of(Ljava/lang/Object;Ljava/lang/Object;)Lcom/google/common/collect/ImmutableList;
INVOKESPECIAL lunar/dn/IlIllIlIlIlIIllIIIlIlIllI.<init>(Ljava/lang/String;Ljava/lang/String;Ljava/lang/Long;Ljava/util/List;)V
C:
LINE C 17
INVOKESTATIC com/google/common/collect/ImmutableList.of(Ljava/lang/Object;)Lcom/google/common/collect/ImmutableList;
INVOKESPECIAL java/util/LinkedHashSet.<init>(Ljava/util/Collection;)V
D:
LINE D 16
ARETURN`,
        replaceWith: `A:
LINE A 9
NEW java/util/LinkedHashSet
DUP
INVOKESPECIAL java/util/LinkedHashSet.<init>()V
ARETURN
B:`
      }
    ],
    modspacket: [
      {
        patchType: "replace",
        scripts: {
          searchFor: "replace1.txt",
          replaceWith: "replace2.txt"
        },
        path: "com/lunarclient/bukkitapi/nethandler/LCPacket",
        methodName: "<clinit>()V",
        searchFor: `AD:
LINE AD 56
BIPUSH 31
LDC Lcom/lunarclient/bukkitapi/nethandler/client/LCPacketModSettings;
INVOKESTATIC com/lunarclient/bukkitapi/nethandler/LCPacket.addPacket(ILjava/lang/Class;)V
AE:`,
        replaceWith: "AE:"
      }
    ]
  }
}