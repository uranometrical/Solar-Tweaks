export const mappings = {
  commit: {
    id: "e976b25",
    fullId: "e976b2532c4c7dfb5969b12ce882ad52d3dbdf38",
    filePath: "lunar/ax/IllIIIlIlIIlIlIlIIIIlIlll"
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
        path: "lunar/dC/lllIlIIIIlIIllllIlIlIlIIl",
        methodName: "IllIIIlIlIIlIlIlIIIIlIlll(Lcom/google/gson/JsonObject;Ljava/util/function/Predicate;Llunar/aS/IIIIlIIIllllIlllIllIIlIIl;)V",
        searchFor: `LDC "enabled"`,
        replaceWith: `LDC "removedByLunarTweaks"`
      }
    ],
    pinnedServers: [
      {
        patchType: "replace",
        scripts: {
          searchFor: "replace1.txt",
          replaceWith: "replace2.txt"
        },
        path: "lunar/dC/lllIlIIIIlIIllllIlIlIlIIl",
        methodName: "run()V",
        searchFor: `LDC "pinnedServers"`,
        replaceWith: `LDC "removedBYLunarTweaks"`
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