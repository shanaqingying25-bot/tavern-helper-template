export const Schema = z.object({
  世界: z.object({
    当前时间: z.string().prefault('0065年春'),
    当前地点: z.string().prefault('海鸣市'),
    剧情阶段: z.enum(['卷入·开端', '相争·结缘', '交织·真相', '终幕·庭园']).prefault('卷入·开端'),
    圣石之种已封印数: z.coerce.number().transform((v) => _.clamp(Math.round(v), 0, 21)).prefault(0),
    事件进展: z.string().prefault('尤诺为回收圣石之种来到地球，化形雪貂；圣石之种开始在市区引发异象。'),
  }),
  关系: z.object({
    奈叶: z.object({
      好感: z.coerce.number().transform((v) => _.clamp(Math.round(v), 0, 100)).prefault(20),
    }),
    尤诺: z.object({
      信任: z.coerce.number().transform((v) => _.clamp(Math.round(v), 0, 100)).prefault(20),
    }),
    菲特: z.object({
      好感: z.coerce.number().transform((v) => _.clamp(Math.round(v), 0, 100)).prefault(0),
    }),
    艾尔芙: z.object({
      好感: z.coerce.number().transform((v) => _.clamp(Math.round(v), 0, 100)).prefault(0),
    }),
    克洛诺: z.object({
      信任: z.coerce.number().transform((v) => _.clamp(Math.round(v), 0, 100)).prefault(10),
    }),
    琳蒂: z.object({
      信任: z.coerce.number().transform((v) => _.clamp(Math.round(v), 0, 100)).prefault(10),
    }),
  }),
  主角: z.object({
    身份设定: z.string().prefault('卷入圣石之种事件的海鸣市居民'),
    立场: z.string().prefault('中立观望'),
    状态: z.string().prefault('健康'),
  }),
});
export type Schema = z.output<typeof Schema>;
